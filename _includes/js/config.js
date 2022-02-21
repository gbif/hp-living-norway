var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
  primary: themeStyle.colors.primary
}});

var siteConfig = {
  routeConfig: {
    datasetKey: {
      url: ({key}) => `/dataset?key=${key}`,
      isHref: true
    },
  },
  occurrence: {
    rootPredicate: { type: 'equals', key: 'publishingOrg', value: "46fec380-8e1d-11dd-8679-b8a03c50a862" }
  }
};