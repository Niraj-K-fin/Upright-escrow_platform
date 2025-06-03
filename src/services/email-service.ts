import { createClient } from '@supabase/supabase-js';
import { Transaction } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const sendEmail = async (options: { to: string; subject: string; html: string }) => {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: options,
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error('Email sending failed: ' + error.message);
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    // Throw a more user-friendly error message
    throw new Error('Unable to send notification email. The transaction will still be processed.');
  }
};

export const sendTransactionCreatedEmail = async (transaction: Transaction) => {
  const emailPromises = [];

  // Email to seller
  emailPromises.push(
    sendEmail({
      to: transaction.sellerEmail,
      subject: 'New Escrow Transaction Created',
      html: `
        <h2>New Escrow Transaction</h2>
        <p>A buyer has initiated a new escrow transaction with you.</p>
        <h3>Transaction Details:</h3>
        <ul>
          <li>Amount: $${transaction.amount}</li>
          <li>Description: ${transaction.productDescription}</li>
          <li>Buyer Email: ${transaction.buyerEmail}</li>
        </ul>
        <p>Please log in to your Upright account to review and confirm this transaction.</p>
      `,
    }).catch(error => {
      console.error('Failed to send seller notification:', error);
      return null; // Continue with other emails even if one fails
    })
  );

  // Email to buyer
  emailPromises.push(
    sendEmail({
      to: transaction.buyerEmail,
      subject: 'Escrow Transaction Initiated',
      html: `
        <h2>Transaction Created Successfully</h2>
        <p>Your escrow transaction has been created and the seller has been notified.</p>
        <h3>Transaction Details:</h3>
        <ul>
          <li>Amount: $${transaction.amount}</li>
          <li>Description: ${transaction.productDescription}</li>
          <li>Seller Email: ${transaction.sellerEmail}</li>
        </ul>
        <p>We'll notify you when the seller confirms the transaction.</p>
      `,
    }).catch(error => {
      console.error('Failed to send buyer notification:', error);
      return null; // Continue with other emails even if one fails
    })
  );

  // Wait for all emails to be sent (or fail)
  await Promise.all(emailPromises);
};

export const sendTransactionConfirmedEmail = async (transaction: Transaction) => {
  try {
    // Email to buyer
    await sendEmail({
      to: transaction.buyerEmail,
      subject: 'Transaction Confirmed by Seller',
      html: `
        <h2>Transaction Confirmed</h2>
        <p>The seller has confirmed your escrow transaction.</p>
        <h3>Transaction Details:</h3>
        <ul>
          <li>Amount: $${transaction.amount}</li>
          <li>Description: ${transaction.productDescription}</li>
        </ul>
        <p>The seller will now proceed with delivering your product/service.</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    // Don't throw, let the transaction continue
  }
};

export const sendDeliveryStartedEmail = async (transaction: Transaction) => {
  try {
    // Email to buyer
    await sendEmail({
      to: transaction.buyerEmail,
      subject: 'Delivery Started',
      html: `
        <h2>Delivery In Progress</h2>
        <p>The seller has started the delivery process for your transaction.</p>
        <h3>Transaction Details:</h3>
        <ul>
          <li>Amount: $${transaction.amount}</li>
          <li>Description: ${transaction.productDescription}</li>
        </ul>
        <p>Once you receive the product/service, please confirm the delivery in your Upright account.</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send delivery started email:', error);
    // Don't throw, let the transaction continue
  }
};

export const sendDeliveryConfirmedEmail = async (transaction: Transaction) => {
  const emailPromises = [];

  // Email to seller
  emailPromises.push(
    sendEmail({
      to: transaction.sellerEmail,
      subject: 'Delivery Confirmed - Payment Released',
      html: `
        <h2>Payment Released</h2>
        <p>The buyer has confirmed delivery of the product/service. The payment has been released to your account.</p>
        <h3>Transaction Details:</h3>
        <ul>
          <li>Amount: $${transaction.amount}</li>
          <li>Description: ${transaction.productDescription}</li>
        </ul>
        <p>Thank you for using Upright Escrow!</p>
      `,
    }).catch(error => {
      console.error('Failed to send seller completion notification:', error);
      return null; // Continue with other emails even if one fails
    })
  );

  // Email to buyer
  emailPromises.push(
    sendEmail({
      to: transaction.buyerEmail,
      subject: 'Delivery Confirmation - Transaction Complete',
      html: `
        <h2>Transaction Complete</h2>
        <p>You have confirmed delivery of the product/service. The payment has been released to the seller.</p>
        <h3>Transaction Details:</h3>
        <ul>
          <li>Amount: $${transaction.amount}</li>
          <li>Description: ${transaction.productDescription}</li>
        </ul>
        <p>Thank you for using Upright Escrow!</p>
      `,
    }).catch(error => {
      console.error('Failed to send buyer completion notification:', error);
      return null; // Continue with other emails even if one fails
    })
  );

  // Wait for all emails to be sent (or fail)
  await Promise.all(emailPromises);
};