// quartz.config.ts - Mission Control configuration
import { defineConfig } from "quartz"
import { Explorer, Graph, Search, Darkmode, ReaderMode, Breadcrumbs, Footer, ContentMeta, ArticleTitle, PageTitle, NoteProperties, TagList, RecentNotes, Spacer } from "quartz/plugins/components"
import { CreatedModifiedDate, SyntaxHighlighting, ObsidianFlavoredMarkdown, GitHubFlavoredMarkdown, TableOfContents, CrawlLinks, Description, Latex, Citations, HardLineBreaks, OxHugo, Roam, Fonts, RemoveDraft, ExplicitPublish, AliasRedirects, ContentIndex, Favicon, OGImage, CNAME, CanvasPage, ContentPage, FolderPage, TagPage, BasesPage, NoteProperties as NotePropertiesPlugin, UnlistedPages, EncryptedPages, StackedPages } from "quartz/plugins/transformers"
import { ContentMeta as ContentMetaPlugin, ArticleTitle as ArticleTitlePlugin, PageTitle as PageTitlePlugin, NoteProperties as NotePropertiesPlugin2, TagList as TagListPlugin, RecentNotes as RecentNotesPlugin, Spacer as SpacerPlugin, Darkmode as DarkmodePlugin, ReaderMode as ReaderModePlugin, Breadcrumbs as BreadcrumbsPlugin, Footer as FooterPlugin, ContentMeta as ContentMetaPlugin2 } from "quartz/plugins/components"

export default defineConfig({
  configuration: {
    pageTitle: "Mission Control",
    pageTitleSuffix: " | Jason Hackett",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "mission-control.jrhackett.com",
    ignorePatterns: [
      "private",
      "templates",
      ".obsidian",
      "home/health", // Private content - excluded from public build
      "Wiki/home/health", // Also exclude via full path
    ],
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      CreatedModifiedDate({
        defaultDateType: "created",
        priority: ["frontmatter", "git", "filesystem"],
      }),
      SyntaxHighlighting({
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }),
      ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: false,
        enableCheckbox: true,
      }),
      GitHubFlavoredMarkdown(),
      TableOfContents({ position: "right", priority: 30 }),
      CrawlLinks({ markdownLinkResolution: "shortest" }),
      Description(),
      Latex({ renderEngine: "katex" }),
      Citations({ enabled: false }),
      HardLineBreaks({ enabled: false }),
      OxHugo({ enabled: false }),
      Roam({ enabled: false }),
      Fonts({ enabled: true }),
      RemoveDraft({ enabled: true }),
      ExplicitPublish({ enabled: false }),
      AliasRedirects({ enabled: true }),
      ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Favicon({ enabled: true }),
      OGImage({ enabled: true }),
      CNAME({ enabled: true }),
      CanvasPage({ enabled: true }),
      ContentPage({ enabled: true }),
      FolderPage({ enabled: true }),
      TagPage({ enabled: true }),
      BasesPage({ enabled: true, options: {} }),
      NotePropertiesPlugin({
        includeAll: false,
        includedProperties: ["description", "tags", "aliases", "date", "project", "type", "campaign", "person", "status"],
        excludedProperties: [],
        hidePropertiesView: false,
        delimiters: "---",
        language: "yaml",
      }),
      UnlistedPages({ enabled: true }),
      EncryptedPages({
        iterations: 600000,
        passwordField: "password",
        unlistWhenEncrypted: false,
        outputPath: "static/encryptedContentIndex.json",
      }),
      StackedPages({ enabled: false }),
    ],
    filters: [RemoveDraft()],
    emitters: [
      ContentPage(),
      FolderPage(),
      TagPage(),
      BasesPage({ options: {} }),
      ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Favicon(),
      OGImage(),
      CNAME(),
    ],
    components: [
      Explorer({
        position: "left",
        priority: 50,
      }),
      Graph({
        position: "right",
        priority: 10,
      }),
      Search({
        position: "left",
        priority: 20,
        group: "toolbar",
        groupOptions: { grow: true },
      }),
      Darkmode({
        position: "left",
        priority: 30,
        group: "toolbar",
      }),
      ReaderMode({
        position: "left",
        priority: 35,
        group: "toolbar",
      }),
      Breadcrumbs({
        position: "beforeBody",
        priority: 5,
        condition: "not-index",
      }),
      Footer({
        links: {
          GitHub: "https://github.com/jackyzha0/quartz",
          Discord: "https://discord.gg/cRFFHYye7t",
        },
      }),
      ContentMeta({
        position: "beforeBody",
        priority: 20,
      }),
      ArticleTitle({
        position: "beforeBody",
        priority: 10,
      }),
      PageTitle({
        position: "left",
        priority: 10,
      }),
      NotePropertiesPlugin2({
        includeAll: false,
        includedProperties: ["description", "tags", "aliases", "date", "project", "type", "campaign", "person", "status"],
        excludedProperties: [],
        hidePropertiesView: false,
        delimiters: "---",
        language: "yaml",
      }),
      TagList({
        enabled: true,
        position: "beforeBody",
        priority: 30,
      }),
      RecentNotes({
        enabled: false,
      }),
      Spacer({
        options: {},
        order: 25,
        position: "left",
        priority: 25,
        display: "mobile-only",
      }),
    ],
  },
  layout: {
    groups: {
      toolbar: {
        priority: 35,
        direction: "row",
        gap: "0.5rem",
      },
    },
    byPageType: {
      "404": {
        positions: {
          beforeBody: [],
          left: [],
          right: [],
        },
      },
      content: {},
      folder: {
        exclude: ["reader-mode"],
        positions: {
          right: [],
        },
      },
      tag: {
        exclude: ["reader-mode"],
        positions: {
          right: [],
        },
      },
      canvas: {},
      bases: {},
    },
  },
})