import axios from 'axios';

export async function fetchPriceCoingecko(cryptoId: string, amount: string): Promise<string | null> {
  try {
    const amountNumber = parseFloat(amount);
    
    if (isNaN(amountNumber)) {
      console.log(`Invalid amount: ${amount}`);
      return null;
    }
    
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
    const data = response.data;
    
    if (data && data[cryptoId] && data[cryptoId].usd) {
      const price = amountNumber * data[cryptoId].usd;
      const formattedPrice = price.toLocaleString(undefined, { maximumFractionDigits: 8 });
      
      return formattedPrice;
    }
    
    return null;
  } catch (error) {
    console.log(`Error retrieving crypto price: ${error}`);
    return null;
  }
}
