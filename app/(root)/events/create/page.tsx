"use client"; // Assurez-vous que ce composant s'exécute côté client

import { useEffect, useState } from "react";
import EventForm from "@/components/shared/EventForm";
import { useAuth } from "@clerk/nextjs"; // Utilisez le hook useAuth

const CreateEvent = () => {
  const { userId, sessionClaims } = useAuth(); // Utilisez le hook useAuth pour obtenir userId et sessionClaims
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoaded(true); // Mark as loaded when userId is available
    }
  }, [userId]);

  // Affichage d'un message de chargement jusqu'à ce que l'authentification soit terminée
  if (!loaded) {
    return <div>Loading...</div>; // Indicateur de chargement
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
