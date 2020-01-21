import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { CallHistoryMethodAction } from "connected-react-router";
import thunk, { ThunkDispatch } from "redux-thunk";
import logger from "redux-logger";

//State, Action, Reducers
import { IAuthState } from "./auth/state";
import { IAuthActions } from "./auth/actions";
import { authReducer } from "./auth/reducer";

import { RouterState, connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { IReferenceTableState } from "./referenceTable/state";
import { IReferenceTableActions } from "./referenceTable/action";
import { referenceTableReducers } from "./referenceTable/reducers";
import { IApartmentState } from "./apartment/state";
import IApartmentActions from "./apartment/actions";
import { apartmentReducer } from "./apartment/reducer";
import { IPhotosUploadState } from './photosUpload/state';
import { photosUploadReducers } from './photosUpload/reducers';
import { IPhotosUploadAction } from './photosUpload/actions'
import { IListingState } from "./listing/state";
import { listingReducers } from "./listing/reducer";
import { IListingActions } from "./listing/actions";
import { IVideoUploadState } from "./videoUpload/state";
import { videoUploadReducers } from "./videoUpload/reducers";
import { IVideoUploadAction } from "./videoUpload/actions";
import { IContentState } from "./content/state";
import { IContentActions } from "./content/actions";
import { contentReducers } from "./content/reducer";



//Development Tools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}


export const history = createBrowserHistory();

//Mark down Different Component State in IRootState
export interface IRootState {
  auth: IAuthState;
  referenceTable: IReferenceTableState;
  apartment: IApartmentState;
  photosUpload: IPhotosUploadState;
  listing: IListingState;
  videoUpload: IVideoUploadState;
  content: IContentState;
  router: RouterState;
}

// Mark down Different Component Action in IRootActions
type IRootAction = IAuthActions
  | CallHistoryMethodAction
  | IReferenceTableActions
  | IApartmentActions
  | IPhotosUploadAction
  | IListingActions
  | IVideoUploadAction
  | IContentActions


// Mark down Different Component Reducer in IRootReducer
const rootReducer = combineReducers<IRootState>({
  auth: authReducer,
  referenceTable: referenceTableReducers,
  apartment: apartmentReducer,
  photosUpload: photosUploadReducers,
  listing: listingReducers,
  videoUpload: videoUploadReducers,
  content: contentReducers,
  router: connectRouter(history),
});

//Development Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type ReduxThunkDispatch = ThunkDispatch<IRootState, null, IRootAction>;

export default createStore<IRootState, IRootAction, {}, {}>(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger),
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
);