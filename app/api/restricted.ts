// import { getServerSession } from "next-auth/next"
// import { authOptions } from "./auth/[...nextauth]/options"
// import { NextRequest, NextResponse } from "next/server"


// export default async (req: NextRequest, res: NextResponse) => {
//   const session = await getServerSession(req, res, authOptions)

//   if (session) {
//     res.send({
//       content:
//         "This is protected content. You can access this content because you are signed in.",
//     })
//   } else {
//     res.send({
//       error: "You must be signed in to view the protected content on this page.",
//     })
//   }
// }