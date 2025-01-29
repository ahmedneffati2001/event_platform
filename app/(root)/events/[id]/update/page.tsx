import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { getAuth } from "@clerk/nextjs/server"

type UpdateEventProps = {
  userId: string;
  event: any;
}

const UpdateEvent = ({ userId, event }: UpdateEventProps) => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm 
          type="Update" 
          event={event} 
          eventId={event._id} 
          userId={userId} // Passez userId à votre composant EventForm
        />
      </div>
    </>
  )
}

// Utilisation de getServerSideProps pour récupérer le userId côté serveur
export const getServerSideProps = async ({ req, params }: any) => {
  try {
    // Récupérer l'utilisateur authentifié côté serveur
    const { userId } = getAuth(req);  // Utilisation de getAuth pour obtenir la session

    if (!userId) {
      return { 
        redirect: { destination: "/login", permanent: false } // Rediriger si non authentifié
      };
    }

    const event = await getEventById(params.id); // Récupérer l'événement par ID

    return {
      props: {
        userId,  // Passez userId en tant que props
        event,   // Passez les données de l'événement
      },
    }
  } catch (error) {
    console.error("Erreur d'authentification ou récupération de l'événement", error);
    return { 
      redirect: { destination: "/login", permanent: false } // En cas d'erreur, rediriger
    };
  }
}

export default UpdateEvent;
