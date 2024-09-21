export function abbreviateFileName(fileName: string, maxLength: number = 15): string {
  if (fileName.length <= maxLength) return fileName
  const extension = fileName.split('.').pop()
  const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'))
  const abbreviatedName = nameWithoutExtension.slice(0, maxLength - 3 - (extension?.length ?? 0))
  return `${abbreviatedName}...${extension}`
}