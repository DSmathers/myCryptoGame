declare namespace NodeJS {
    export interface ProcessEnv {
      HOST: string;
      DB_URL: string;
      DB_NAME?: string;
      REACT_APP_TOP_TEN_ENDPOINT: string
    }
  }