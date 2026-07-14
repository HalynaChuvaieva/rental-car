// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";

// const CamperDetailsClient = () => {
//   const { id } = useParams<{ id: string }>();

//   const {
//     data: camper,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["note", id],
//     queryFn: () => getSingleCamper(id),
//     refetchOnMount: false,
//   });

//   if (isLoading) return <p>Loading...</p>;

//   if (error || !camper) return <p>Some error..</p>;

//   const formattedDate = note.updatedAt
//     ? `Updated at: ${note.updatedAt}`
//     : `Created at: ${note.createdAt}`;

//   return (
//     <div>
//       <h2>{note.title}</h2>
//       <p>{note.content}</p>
//       <p>{formattedDate}</p>
//     </div>
//   );
// };

// export default CamperDetailsClient;
