const forceLoadSections = new Set<string>()

export const forceLoadSection = (sectionId: string) => {
  forceLoadSections.add(sectionId)
}

export const isForceLoaded = (sectionId: string) => {
  return forceLoadSections.has(sectionId)
}

export const consumeForceLoad = (sectionId: string) => {
  const had = forceLoadSections.has(sectionId)
  forceLoadSections.delete(sectionId)
  return had
}
