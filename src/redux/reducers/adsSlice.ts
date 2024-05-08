import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getFirebaseDoc } from '../../api/getFirebaseDoc/getFirebaseDoc';
import { getFirebaseDocs } from '../../api/getFirebaseDocs/getFirebaseDocs';
import { ads, adsMain } from '../../pages/Ads/ads.interface';

interface adsState {
    loading: boolean,
    error: string | undefined,
    adsList: ads[],
    main: adsMain
}

//thunks
export const fetchMainAds = createAsyncThunk(
    'ads/fetchMainAdsClient',
    async () => {
        
        const docSnap = await getFirebaseDoc('/Avisos/1x9cYIlY1FaQcw9jZhf6')
        return docSnap
    }
)

export const fetchAds = createAsyncThunk(
    'ads/fetchAdsClient',
    async () => {        
        const docSnap = await getFirebaseDocs('/Avisos/1x9cYIlY1FaQcw9jZhf6/Anuncios')
        return docSnap
    }
)

const initialState: adsState = {
    loading: false,
    error: undefined,
    adsList: [],
    main:     {
        estado: 1,
        titulo: '',
        subtitulo: '',
        image_url: '',
        download_url: '' 
    }
}

const adsSlice =  createSlice({
    name: 'ads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
        builder.addCase(fetchMainAds.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchMainAds.fulfilled, (state,action: PayloadAction<any>) => {
            state.loading = false,            
            state.main = action.payload               

        });
        builder.addCase(fetchMainAds.rejected, (state,action) => {
            state.loading = false
            state.error = action.error.message;            
        });
        builder.addCase(fetchAds.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchAds.fulfilled, (state,action: PayloadAction<any[]>) => {
            state.loading = false,
            state.adsList = action.payload
        });
        builder.addCase(fetchAds.rejected, (state,action) => {
            state.loading = false
            state.adsList = [] as ads[],
            state.error = action.error.message;            
        });    
    }
}
)

export const adsSelector = (state: RootState) => state.avisos
export default adsSlice.reducer;