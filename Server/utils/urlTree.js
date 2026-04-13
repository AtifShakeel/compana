import { v4 as uuidv4 } from "uuid";

function buildUrlTree(urls) {
  const root = {};

  const pagesCategory = {
    id: uuidv4(),
    name: "pages",
    path: "/pages",
    url: null,
    selected: false,
    children: {},
  };

  urls.forEach((url) => {
    try {
      const parsed = new URL(url);
      const base = parsed.origin;

      const path = parsed.pathname;
      const parts = path.split("/").filter(Boolean);

      let current = root;

      parts.forEach((part, index) => {
        const currentPath = "/" + parts.slice(0, index + 1).join("/");
        const currentURL = base + currentPath;

        // Optional: clean display name
        const cleanName = decodeURIComponent(part).replace(/-/g, " ");

        if (!current[part]) {
          current[part] = {
            id: uuidv4(),
            name: cleanName,
            slug: part, 
            path: currentPath,
            url: currentURL, 
            selected: false,
            children: {},
          };
        }

        current = current[part].children;
      });
    } catch (err) {
      console.error("Invalid URL skipped:", url);
    }
  });

  // ✅ Move standalone root-level pages into "pages" category
  const keysToDelete = [];

  Object.entries(root).forEach(([key, value]) => {
    if (Object.keys(value.children).length === 0) {
      pagesCategory.children[key] = value;
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach((key) => delete root[key]);

  // Add pages category only if needed
  if (Object.keys(pagesCategory.children).length > 0) {
    root["pages"] = pagesCategory;
  }

  return root;
}

export default buildUrlTree;