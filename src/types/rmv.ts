export interface DepartureBoard {
  TechnicalMessages?: TechnicalMessages;
  Warnings?: Warnings;
  serverVersion?: string;
  dialectVersion?: string;
  version?: string;
  planRtTs?: string; // date-time
  errorCode?: string;
  errorText?: string;
  internalErrorCode?: string;
  internalErrorText?: string;
  internalErrorTextOut?: string;
  requestId?: string;
  Departure?: Departure[];
  Message?: Message[];
  stopid?: string;
  stopName?: string;
  stopExtId?: string;
}

export interface Departure {
  JourneyDetailRef?: JourneyDetailRef;
  JourneyStatus?: "P" | "R" | "A" | "S";
  ProductAtStop?: ProductType;
  Product?: ProductType[];
  Notes?: Notes;
  Messages?: Messages;
  Directions?: Directions;
  altId?: string[];
  mainMastAltId?: string[];
  Stops?: Stops;
  Occupancy?: OccupancyType[];
  ParallelJourneyRef?: ParallelJourneyRefType[];
  referencedJourney?: ReferencedJourneyType[];
  platform?: PlatformType;
  rtPlatform?: PlatformType;
  mainMast?: StopLocation;
  name?: string;
  type?: string;
  stop?: string;
  stopid?: string;
  stopExtId?: string;
  lon?: number;
  lat?: number;
  alt?: number;
  isMainMast?: boolean;
  hasMainMast?: boolean;
  mainMastId?: string;
  mainMastExtId?: string;
  mainMastLon?: number;
  mainMastLat?: number;
  mainMastAlt?: number;
  prognosisType?: "PROGNOSED" | "MANUAL" | "REPORTED" | "CORRECTED" | "CALCULATED";
  time: string;
  scheduledTimeChanged?: boolean;
  date?: string;
  tz?: number;
  track?: string;
  trackHidden?: boolean;
  rtTime?: string;
  rtDate?: string;
  rtTz?: number;
  rtTrack?: string;
  rtTrackHidden?: boolean;
  cancelled?: boolean;
  partCancelled?: boolean;
  reachable?: boolean;
  redirected?: boolean;
  direction?: string;
  directionFlag?: string;
  directionExtId?: string;
  timeAtArrival?: string;
  dateAtArrival?: string;
  rtTimeAtArrival?: string;
  rtDateAtArrival?: string;
}

export interface JourneyDetailRef {
  ref: string;
}

export interface ProductType {
  name?: string;
  internalName?: string;
  displayName?: string;
  num?: string;
  line?: string;
  admin?: string;
  operatorCode?: string;
  operator?: string;
  catOut?: string;
  catIn?: string;
  catCode?: string;
  catOutS?: string;
  catOutL?: string;
  cls?: string;
  icon?: IconType;
  matchId?: string;
}

export interface IconType {
  res?: string;
  backgroundColor?: { hex?: string }
}

export interface Notes {
  Note: Note[];
}

export interface Note {
  value: string;
  key?: string;
  type?: string;
  priority?: number;
  routeIdxFrom?: number;
  routeIdxTo?: number;
}

export interface Messages {
  Message: Message[];
}

export interface Message {
  id?: string;
  externalId?: string;
  type?: string;
  header?: string;
  text?: string;
  priority?: number;
  sdate?: string;
  stime?: string;
  edate?: string;
  etime?: string;
  url?: string;
  head?: string;
  lead?: string;
}

export interface Directions {
  Direction: Direction[];
}

export interface Direction {
  value: string;
  flag?: string;
}

export interface Stops {
  Stop: StopType[];
}

export interface StopType {
  name?: string;
  id?: string;
  extId?: string;
  routeIdx?: number;
  lon?: number;
  lat?: number;
  depTime?: string;
  depDate?: string;
  arrTime?: string;
  arrDate?: string;
  rtDepTime?: string;
  rtDepDate?: string;
  rtArrTime?: string;
  rtArrDate?: string;
}

export interface OccupancyType {
  name?: string;
  value?: string;
}

export interface ParallelJourneyRefType {
  ref?: string;
}

export interface ReferencedJourneyType {
  ref?: string;
}

export interface PlatformType {
  type?: string;
  text?: string;
}

export interface StopLocation {
  name?: string;
  id?: string;
  extId?: string;
  lon?: number;
  lat?: number;
}

export interface TechnicalMessages {
  TechnicalMessage: TechnicalMessage[];
}

export interface TechnicalMessage {
  value: string;
  key?: string;
}

export interface Warnings {
  Warning: Warning[];
}

export interface Warning {
  value: string;
  key?: string;
}
