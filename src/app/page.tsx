"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tab"
import { useExtensionDownloader } from "@/hooks/use-extension-downloader"
import { MacWrapper } from "./mac-wrapper"
import { Button } from "@/components/ui/button"
import { IconDownload, IconArrowRight, IconRefresh } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExtensionDownloader() {
  const {
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
    handleUrlSubmit,
    handleManualSubmit,
  } = useExtensionDownloader()

  return (
    <MacWrapper wallpaper="/sequioa-wallpaper.jpg">
      <div className="container py-6">
        <Card className="w-full bg-neutral-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-center">Dextension</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="url" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">From URL</TabsTrigger>
                <TabsTrigger id="manual-tab" value="manual">
                  Manual Entry
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4 mt-5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="extension-url" className="font-semibold tracking-tight">VS Code Marketplace URL</label>
                    <div className="flex gap-2">
                      <Input
                        id="extension-url"
                        placeholder="https://marketplace.visualstudio.com/items?itemName=publisher.extension"
                        value={url}
                        onChange={(e) => {
                          setUrl(e.target.value)
                          setDownloadUrl("")
                          setVersions([])
                          setSelectedVersion("")
                        }}
                      />
                      {downloadUrl && versions.length > 0 && url ? (
                        <Button asChild>
                          <a href={downloadUrl} download>
                            <IconDownload className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      ) : (
                        <Button onClick={handleUrlSubmit} disabled={loading}>
                          {loading ? (
                            <IconRefresh className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <IconArrowRight className="h-4 w-4 mr-2" />
                          )}
                          Parse
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400/90 font-semibold tracking-tight">
                      Enter the URL of the extension from VS Code Marketplace
                    </p>
                  </div>

                  {versions.length > 0 && downloadUrl && url && (
                    <div className="space-y-2">
                      <label htmlFor="version-select">Available Versions</label>
                      <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                        <SelectTrigger id="version-select">
                          <SelectValue placeholder="Select a version" />
                        </SelectTrigger>
                        <SelectContent>
                          {versions.map((version) => (
                            <SelectItem key={version} value={version}>
                              {version}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="publisher">Publisher</label>
                      <Input
                        id="publisher"
                        placeholder="e.g., denoland"
                        value={manualPublisher}
                        onChange={(e) => setManualPublisher(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="extension">Extension</label>
                      <Input
                        id="extension"
                        placeholder="e.g., vscode-deno"
                        value={manualExtension}
                        onChange={(e) => setManualExtension(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="version">Version</label>
                    <Input
                      id="version"
                      placeholder="e.g., 3.43.3"
                      value={manualVersion}
                      onChange={(e) => setManualVersion(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Find this in the Version History tab on the extension page
                    </p>
                  </div>
                  {downloadUrl ? (
                    <Button asChild className="w-full">
                      <a href={downloadUrl} download>
                        <IconDownload className="h-4 w-4 mr-2" />
                        Download Extension
                      </a>
                    </Button>
                  ) : (
                    <Button onClick={handleManualSubmit} className="w-full">
                      Generate Download URL
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex-col items-start">
            <h3 className="font-medium mb-2">Installation Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Generate and download the extension using the form above</li>
              <li>Open Trae and navigate to the Extension Store</li>
              <li>Drag the downloaded .vsix file to the Extension Store panel</li>
              <li>Trae will automatically install the extension</li>
            </ol>
          </CardFooter>
        </Card>
      </div>
    </MacWrapper>
  )
}

