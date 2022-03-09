var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
  primary: themeStyle.colors.primary
}});

var siteConfig = {
  routes: {
    occurrenceSearch: {
      // The route you are currently using for occurrence search. The language prefix will be added automatically
      // If you need special routes per language, then you have to add locale specific overwrites. The page language is available as a global variable called `pageLang`
      route: '/data'
    },
    datasetKey: {
      url: ({key}) => `/dataset?key=${key}`,
      isHref: true
    }
  },
  occurrence: {
    rootPredicate: { type: 'equals', key: 'networkKey', value: "379a0de5-f377-4661-9a30-33dd844e7b9a" }
  }
};