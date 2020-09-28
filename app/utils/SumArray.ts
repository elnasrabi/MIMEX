

export async function sumArray(arr:any,key:any) {

    return arr.reduce((a, b) => a + (b[key] || 0), 0);
 
  }