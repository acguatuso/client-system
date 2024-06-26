import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getFirebaseDoc } from '../../api/getFirebaseDoc/getFirebaseDoc';
import { getFirebaseDocs } from '../../api/getFirebaseDocs/getFirebaseDocs';
import { service, serviceMain } from '../../pages/ServicesPage/service.interface';

interface ServiceState {
    loading: boolean,
    error: string | undefined,
    ServiceList: service[],
    main: serviceMain
}

//thunks
export const fetchMainService = createAsyncThunk(
    'Service/fetchMainServiceClient',
    async () => {
        
        const docSnap = await getFirebaseDoc('/Servicios/xsc94XcgZ4Agn9IisLop')
        return docSnap
    }
)

export const fetchService = createAsyncThunk(
    'Service/fetchServiceClient',
    async () => {        
        const docSnap = await getFirebaseDocs('/Servicios/xsc94XcgZ4Agn9IisLop/Lista_servicios')        
        return docSnap
    }
)

const initialState: ServiceState = {
    loading: false,
    error: undefined,
    ServiceList: [],
    main:     {
        estado: 1,
        titulo: '',
        subtitulo: '',
        image_url: '',
        download_url: '' 
    }
}

const serviceSlice =  createSlice({
    name: 'Service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
        builder.addCase(fetchMainService.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchMainService.fulfilled, (state,action: PayloadAction<any>) => {
            state.loading = false,            
            state.main = action.payload               

        });
        builder.addCase(fetchMainService.rejected, (state,action) => {
            state.loading = false
            state.error = action.error.message;            
        });
        builder.addCase(fetchService.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchService.fulfilled, (state,action: PayloadAction<any[]>) => {
            state.loading = false,
            state.ServiceList = action.payload
        });
        builder.addCase(fetchService.rejected, (state,action) => {
            state.loading = false
            state.ServiceList = [] as service[],
            state.error = action.error.message;            
        });    
    }
})

export const ServiceSelector = (state: RootState) => state.servicios
export default serviceSlice.reducer;