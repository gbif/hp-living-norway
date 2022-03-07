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
    rootPredicate: { type: 'equals', key: 'networkKey', value: "379a0de5-f377-4661-9a30-33dd844e7b9a" }
  }
};