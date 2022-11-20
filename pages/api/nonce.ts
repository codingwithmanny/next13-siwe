// Imports
// ========================================================
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateNonce } from 'siwe';
import ironOptions from '../../config/ironOptions';

// Hanlder
// ========================================================
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'GET':
        const currentDate = new Date();
        req.session.nonce = generateNonce();
        req.session.issuedAt = currentDate.toISOString();
        req.session.expirationTime = new Date(
            currentDate.getTime() + 5 * 60 * 1000,
        ).toISOString();
        await req.session.save();
        res.setHeader('Content-Type', 'text/plain');
        res.send({
            issuedAt: req.session.issuedAt,
            expirationTime: req.session.expirationTime,
            nonce: req.session.nonce,
        });
        break;
    default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
  }
};
 
// Exports
// ========================================================
export default withIronSessionApiRoute(handler, ironOptions)