import { Button, ButtonProps } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import MapIframe from "./map-iframe";
  
interface MapButtonProps extends ButtonProps {
    title: string
    lat: string
    lng: string
}

export default function MapButton({title, lat, lng, ...props}: MapButtonProps) {
    const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`;
    return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant="link" {...props}>Show on Map</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <VisuallyHidden>
                <DialogDescription>
                    Location map
                </DialogDescription>
                </VisuallyHidden>
            </DialogHeader>
            <MapIframe lat={lat} lng={lng}/>
        </DialogContent>
    </Dialog>
    )
}
  