import {createSlice} from '@reduxjs/toolkit';

const initialState={
    customerName:"",
    customerPhone:"",
    guests:0,
    table:null
}

const customerSlice=createSlice({
    name:"customer",
    initialState,
    reducers:{
        setCustomerName:(state, action)=>{
            const{name,phone,guests}=action.payload;
            state.orderId=`${Date.now()}`;
            state.customerName=name;
            state.customerPhone=phone;
            state.guests=guests;
        },

        removeCustomer:(state)=>{
            state.orderId="";
            state.customerName="";
            state.customerPhone="";
            state.guests=0;
            state.table=null;
        },

        updateTable:(state, action)=>{
            state.table=action.payload.table;
        }
    }
})

export const {setCustomerName, removeCustomer, updateTable}=customerSlice.actions;
export default customerSlice.reducer;