import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            if (!existingItem) {
                state.items.push({ ...item, quantity: 1 });
                state.totalItems += 1;
                state.totalPrice += item.price;
            }
        },
        incrementItem: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity += 1;
                state.totalItems += 1;
                state.totalPrice += item.price;
            }
        },
        decrementItem: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalItems -= 1;
                state.totalPrice -= item.price;
            }
        },
        deleteItem: (state, action) => {
            const itemIndex = state.items.findIndex(i => i.id === action.payload.id);
            if (itemIndex >= 0) {
                const item = state.items[itemIndex];
                state.totalItems -= item.quantity;
                state.totalPrice -= item.quantity * item.price;
                state.items.splice(itemIndex, 1);
            }
        },
    },
});

export const { addToCart, incrementItem, decrementItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
