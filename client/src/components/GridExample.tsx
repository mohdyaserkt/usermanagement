import  {  useEffect, useMemo, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import {
  
  ColDef,
  ModuleRegistry,
} from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { axiosInstance } from '../config/axios';

ModuleRegistry.registerModules([ClientSideRowModelModule]);



const GridExample = () => {
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>([]);
useEffect(() => {
    getUserData()

}, [])

let getUserData= async()=>{
    let  data =  (await axiosInstance.get('/users')).data.content
    
    setRowData(data)
}



  

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'name',
      headerName: 'Name',
      checkboxSelection: true,
    },
    {
      field: 'emailId',
      headerName: 'Email',
    },
    {
      field: 'gender',
      headerName: 'Gender',
    },
    {
      field: 'count',
      headerName: 'Count',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'lastLoginDate',
      headerName: 'Last Login Date',
    },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex: 1,
    };
  }, []);

 

  return (
    <div style={gridStyle} className="ag-theme-quartz-dark">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Users
      </h3>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
      />
    </div>
  );
};

export default GridExample;
