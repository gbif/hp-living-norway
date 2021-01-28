var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
  primary: themeStyle.colors.primary
}});

var siteConfig = {
  rootPredicate: { type: 'equals', key: 'publishingOrg', value: "8256e897-3a17-4a2d-8bf8-54cf22b624bd" }
};
