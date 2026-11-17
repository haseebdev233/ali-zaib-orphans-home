import { push, ref, serverTimestamp, update } from 'firebase/database';
import { db } from '../firebase';

export const proofTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
export const maxProofSize = 2 * 1024 * 1024;

export async function readProof(file) {
  if (!proofTypes.includes(file.type) || file.size < 1 || file.size > maxProofSize) {
    throw new Error('Choose a JPG, PNG, WebP or PDF file up to 2 MB.');
  }
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const startsWith = (...signature) => signature.every((value, index) => bytes[index] === value);
  const valid = {
    'image/jpeg': startsWith(0xff, 0xd8, 0xff),
    'image/png': startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a),
    'image/webp': startsWith(0x52, 0x49, 0x46, 0x46) && String.fromCharCode(...bytes.slice(8)) === 'WEBP',
    'application/pdf': startsWith(0x25, 0x50, 0x44, 0x46, 0x2d),
  };
  if (!valid[file.type]) throw new Error('The attachment does not match its file type.');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read the attachment. Choose the file again.'));
    reader.readAsDataURL(file);
  });
}

export async function recordDonation(fields, proof, id = push(ref(db, 'donations')).key) {
  const reference = `AZOH-${id}`;
  const writes = {
    [`donations/${id}`]: {
      ...fields,
      reference,
      donationId: reference,
      status: 'pending',
      submittedAt: serverTimestamp(),
      ...(proof && { paymentProofFileName: proof.name, paymentProofType: proof.type, paymentProofSize: proof.size }),
    },
  };
  if (proof) writes[`donationProofs/${id}`] = proof.dataUrl;
  await update(ref(db), writes);
  return reference;
}
