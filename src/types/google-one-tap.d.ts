declare module "google-one-tap" {
  interface GoogleOneTapOptions {
    client_id: string;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    context?: string;
    callback: (response: { credential: string }) => void;
  }

  function googleOneTap(options: GoogleOneTapOptions): void;
  export default googleOneTap;
}
