import { toUrlSlug } from "@/utils/commonUtils";
import {
  handleGetFirestore,
  handleQueryFirestore,
} from "@/utils/firestoreUtils";

const URL = "https://exclusivmd.ro";

export default async function sitemap() {
  const judeteData = await handleGetFirestore("Judete");
  const parteneri = await handleQueryFirestore("Users", "userType", "Partener");

  const seenUrls = new Set();

  const judeteCategorii = parteneri.reduce((acc, { partener, _updatedAt }) => {
    const url = `${URL}/${partener.categorie.toLowerCase()}/${partener.categorie.toLowerCase()}-${partener.judet.toLowerCase()}`;
    if (!seenUrls.has(url)) {
      seenUrls.add(url);
      acc.push({
        url: url,
        lastModified: _updatedAt,
      });
    }
    return acc;
  }, []);

  const parteners = parteneri.map(({ item, _updatedAt }) => ({
    url: `${URL}/partener/${item?.id}-${toUrlSlug(item?.denumireBrand)}`,
    lastModified: _updatedAt,
  }));

  const judete = judeteData.map(({ judet, _updatedAt }) => ({
    url: `${URL}/${judet.judet.toLowerCase()}`,
    lastModified: _updatedAt,
  }));

  const routes = [
    "",
    "/despre-noi",
    "/termeni-confidentialitate",
    "/contact",
    "/plangeri",
    "/autovehicule",
    "/servicii",
    "/cafenele",
    "/restaurante",
    "/hoteluri",
    "/altele",
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...judete, ...judeteCategorii, ...parteners];
}
