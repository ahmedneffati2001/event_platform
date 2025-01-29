// core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

// Créer une instance d'uploadthing
const f = createUploadthing();

// Simuler une fonction d'authentification pour l'exemple
const auth = (req: Request) => ({ id: "fakeId" }); // Remplacez par votre logique réelle

// Définir le FileRouter pour l'upload des images
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB", // Limite de taille de fichier
      // Autres paramètres de types de fichiers ici
    }
  })
    .middleware(async ({ req }) => {
      try {
        const user = await auth(req); // Appel à la fonction d'authentification
        if (!user) throw new Error("Unauthorized"); // Vérification d'authentification

        // Retourner les données qui seront accessibles après l'upload
        return { userId: user.id };
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        throw new Error("Unauthorized");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Cette fonction s'exécute après l'upload
      console.log("Upload complet pour userId:", metadata.userId);
      console.log("URL du fichier:", file.url);

      // Retourner des informations au client
      return { uploadedBy: metadata.userId };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
