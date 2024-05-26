type DataItem = {
    _id: string;
    count: number;
  };
  
  function getLast30Days(): string[] {
    const dates: string[] = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      dates.push(formattedDate);
    }
    return dates;
  }
  
  export async function createDataArray(data: DataItem[]): Promise<(string | number)[][]> {
    const last30Days = getLast30Days();
    const dataArray: (string | number)[][] = [['Date', 'Count']];
  
    last30Days.forEach(day => {
      const match = data.find(item => item._id === day);
      if (match) {
        dataArray.push([match._id, match.count]);
      } else {
        dataArray.push([day, 0]);
      }
    });
  
    return dataArray;
  }
  