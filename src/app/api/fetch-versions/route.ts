import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    const response = await fetch(url)
    const html = await response.text()

    const versions = extractVersions(html)

    if (versions.length === 0) {
      const latestVersion = extractLatestVersion(html)
      if (latestVersion) {
        return NextResponse.json({ versions: [latestVersion] })
      }
      return NextResponse.json({ error: "No versions found" }, { status: 404 })
    }

    return NextResponse.json({ versions })
  } catch (error) {
    console.error("Error fetching versions:", error)
    return NextResponse.json({ error: "Failed to fetch versions" }, { status: 500 })
  }
}

function extractVersions(html: string): string[] {
  const versionRegex = /Version\s+(\d+\.\d+\.\d+)/g
  const matches = [...html.matchAll(versionRegex)]

  const versions = new Set<string>()
  matches.forEach((match) => {
    if (match[1]) {
      versions.add(match[1])
    }
  })

  const alternativeRegex = /"version"\s*:\s*"(\d+\.\d+\.\d+)"/g
  const altMatches = [...html.matchAll(alternativeRegex)]
  altMatches.forEach((match) => {
    if (match[1]) {
      versions.add(match[1])
    }
  })

  return Array.from(versions)
}

function extractLatestVersion(html: string): string | null {
  const metaVersionRegex = /<meta\s+[^>]*content="(\d+\.\d+\.\d+)"[^>]*>/i
  const metaMatch = html.match(metaVersionRegex)

  if (metaMatch && metaMatch[1]) {
    return metaMatch[1]
  }

  const installCommandRegex = /install\s+[^.]+\.([^.]+-[^.]+)\s+/i
  const commandMatch = html.match(installCommandRegex)

  if (commandMatch && commandMatch[1]) {
    const versionRegex = /(\d+\.\d+\.\d+)/
    const nearbyText = html.substring(commandMatch.index || 0, (commandMatch.index || 0) + 500)
    const versionMatch = nearbyText.match(versionRegex)

    if (versionMatch && versionMatch[1]) {
      return versionMatch[1]
    }
  }

  return null
}

