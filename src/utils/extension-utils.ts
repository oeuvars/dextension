/**
 * Utility functions for VS Code extension operations
 */

/**
 * Parse a VS Code Marketplace URL to extract publisher and extension name
 */
export const parseExtensionUrl = (inputUrl: string) => {
  try {
    // Extract itemName from URL
    const urlObj = new URL(inputUrl)
    const itemName = urlObj.searchParams.get("itemName")

    if (!itemName) {
      throw new Error("Could not find extension information in URL")
    }

    const [publisher, extension] = itemName.split(".")

    if (!publisher || !extension) {
      throw new Error("Invalid extension format in URL")
    }

    return {
      publisher,
      extension,
    }
  } catch (err) {
    throw new Error("Invalid URL format. Please check the URL and try again.")
  }
}

/**
 * Generate a download URL for a VS Code extension
 */
export const generateDownloadUrl = (publisher: string, extension: string, version: string) => {
  return `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${publisher}/vsextensions/${extension}/${version}/vspackage`
}