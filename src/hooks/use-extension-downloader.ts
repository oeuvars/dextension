import { useState, useEffect } from "react"
import { parseExtensionUrl, generateDownloadUrl } from "@/utils/extension-utils"

export interface ExtensionData {
  publisher: string
  extension: string
}

export function useExtensionDownloader() {
  const [url, setUrl] = useState("")
  const [manualPublisher, setManualPublisher] = useState("")
  const [manualExtension, setManualExtension] = useState("")
  const [manualVersion, setManualVersion] = useState("")
  const [downloadUrl, setDownloadUrl] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [versions, setVersions] = useState<string[]>([])
  const [selectedVersion, setSelectedVersion] = useState("")
  const [parsedData, setParsedData] = useState<ExtensionData | null>(null)

  // Update download URL when selected version changes
  useEffect(() => {
    if (parsedData && selectedVersion) {
      const generatedUrl = generateDownloadUrl(parsedData.publisher, parsedData.extension, selectedVersion)
      setDownloadUrl(generatedUrl)
    }
  }, [selectedVersion, parsedData])

  const fetchVersions = async (inputUrl: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/fetch-versions?url=${encodeURIComponent(inputUrl)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch versions")
      }

      if (data.versions && data.versions.length > 0) {
        setVersions(data.versions)
        setSelectedVersion(data.versions[0]) // Select the first version by default
        return true
      } else {
        setError("No versions found for this extension. Please enter the version manually.")
        return false
      }
    } catch (err) {
      setError("Failed to fetch versions. Please enter the version manually.")
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleUrlSubmit = async () => {
    setError("")
    setVersions([])
    setSelectedVersion("")
    setDownloadUrl("")

    try {
      const parsed = parseExtensionUrl(url)
      setParsedData(parsed)

      setManualPublisher(parsed.publisher)
      setManualExtension(parsed.extension)

      const success = await fetchVersions(url)

      if (success) {
        if (versions.length > 0) {
          const generatedUrl = generateDownloadUrl(parsed.publisher, parsed.extension, selectedVersion || versions[0])
          setDownloadUrl(generatedUrl)
        }
      } else {
        document.getElementById("manual-tab")?.click()
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    }
  }

  const handleManualSubmit = () => {
    setError("")
    if (!manualPublisher || !manualExtension || !manualVersion) {
      setError("All fields are required")
      return
    }

    const generatedUrl = generateDownloadUrl(manualPublisher, manualExtension, manualVersion)
    setDownloadUrl(generatedUrl)
  }

  return {
    url,
    setUrl,
    manualPublisher,
    setManualPublisher,
    manualExtension,
    setManualExtension,
    manualVersion,
    setManualVersion,
    downloadUrl,
    setDownloadUrl,
    error,
    loading,
    versions,
    setVersions,
    selectedVersion,
    setSelectedVersion,
    parsedData,
    handleUrlSubmit,
    handleManualSubmit,
  }
}
