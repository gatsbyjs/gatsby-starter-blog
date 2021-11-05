import { initPlasmicLoader } from "@plasmicapp/loader-gatsby"
import {
  PostDate,
  PostExcerpt,
  PostLink,
  PostList,
  PostTitle,
} from "./components/plasmic"

export function initPlasmicLoaderWithRegistrations(plasmicOptions: any) {
  const PLASMIC = initPlasmicLoader(plasmicOptions)

  PLASMIC.registerComponent(PostList, {
    name: "PostList",
    props: {
      children: "slot",
      offset: "number",
      count: "number",
      gap: {
        defaultValue: 32,
        type: "number",
      },
    },
  })

  PLASMIC.registerComponent(PostLink, {
    name: "PostLink",
    props: {
      children: "slot",
    },
  })

  PLASMIC.registerComponent(PostTitle, {
    name: "PostTitle",
    props: {},
  })

  PLASMIC.registerComponent(PostDate, {
    name: "PostDate",
    props: {},
  })

  PLASMIC.registerComponent(PostExcerpt, {
    name: "PostExcerpt",
    props: {},
  })

  return PLASMIC
}
