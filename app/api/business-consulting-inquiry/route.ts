import { Router } from 'next/router';
import { BusinessConsultingInquiry } from '../../components/BusinessConsultingInquiry';

export default async function handler(req: any, res: any) {
  const { method, body } = req;
  const { id } = body;

  switch (method) {
    case 'GET':
      try {
        const businessConsultingInquiry = await BusinessConsultingInquiry(id);
        return res.status(200).json(businessConsultingInquiry);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching business consulting inquiry' });
      }
    case 'POST':
      try {
        const businessConsultingInquiry = await BusinessConsultingInquiry.create(id);
        return res.status(201).json(businessConsultingInquiry);
      } catch (error) {
        return res.status(500).json({ message: 'Error creating business consulting inquiry' });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
