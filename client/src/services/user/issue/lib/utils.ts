export type IssuePayload = {
    title: string;
    description: string;
    location?: string;
    images?: string[];
  };

export const buildIssuePayload = (
    form: FormData,
    imageUrls: string[]
  ): IssuePayload => ({
    title: form.get("title")?.toString() ?? "",
    description: form.get("description")?.toString() ?? "",
    location: form.get("location")?.toString() ?? "",
    images: imageUrls,
});




export async function getCurrentLocation(): Promise<string> {

  if (typeof window !== "undefined" && "navigator" in window && "geolocation" in navigator) {
    return new Promise<string>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = pos.coords;
          resolve(`${coords.latitude},${coords.longitude}`);
        },
        () => resolve(""),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
      );
    });
  }
  return "";
}
