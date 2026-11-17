import emailjs from '@emailjs/browser';

export function notifyDonationStaff(donation, reference, proofName) {
  const { donorInfo } = donation;
  return emailjs.send('service_7ou5sxv', 'template_vvj94er', {
    to_email: 'pmalizaib@gmail.com',
    donor_name: donorInfo.anonymous ? 'Anonymous Donor' : donorInfo.name,
    donor_email: donorInfo.email,
    donor_phone: donorInfo.phone,
    donor_message: donorInfo.message,
    donation_type: donation.displayType,
    donation_amount: `PKR ${donation.amount.toLocaleString('en-PK')}`,
    transaction_id: reference,
    reference_number: reference,
    donation_date: new Date().toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' }),
    payment_proof_file: proofName || 'No attachment',
    anonymous: donorInfo.anonymous ? 'Yes' : 'No',
    amount_match: 'Pending review',
    reference_match: 'Pending review',
    user_entered_amount: donation.amount,
    user_entered_reference: donation.bankReference,
  }, '8kOqhmCqeBHCcxRUl');
}
