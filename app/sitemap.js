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
    if (partener?.categorie && partener?.judet) {
      // Verifică dacă există categorie și judet
      const url = `${URL}/${partener.categorie.toLowerCase()}/${partener.categorie.toLowerCase()}-${partener.judet.toLowerCase()}`;
      if (!seenUrls.has(url)) {
        seenUrls.add(url);
        acc.push({
          url: url,
          lastModified: _updatedAt,
        });
      }
    }
    return acc;
  }, []);

  const parteners = parteneri.reduce((acc, { item, _updatedAt }) => {
    if (item?.id && item?.denumireBrand) {
      // Verifică dacă există id și denumireBrand
      const url = `${URL}/partener/${item.id}-${toUrlSlug(item.denumireBrand)}`;
      acc.push({
        url: url,
        lastModified: _updatedAt,
      });
    }
    return acc;
  }, []);

  const judete = judeteData.reduce((acc, { judet, _updatedAt }) => {
    if (judet?.judet) {
      // Verifică dacă există judet
      const url = `${URL}/${judet.judet.toLowerCase()}`;
      acc.push({
        url: url,
        lastModified: _updatedAt,
      });
    }
    return acc;
  }, []);

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
