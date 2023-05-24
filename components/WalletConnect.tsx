import { useAccount } from "wagmi";
import Button from "./Button";
import router, { useRouter } from "next/router";
import NotifiBell from "./NotifiBell";
import ConnectButtonCustom from "./ConnectButtonCustom";

export default function WalletConnect() {

  const { isConnected } = useAccount();

  const route = useRouter();
  const { pathname } = route;

  if (!isConnected) return <ConnectButtonCustom/>

  return (
    <>
      <div className="space-x-[10px]">
        {pathname === "/" ? (
          <div className="space-x-[10px] flex items-center">
            <NotifiBell />
            <Button
              onClick={()=>{router.push('/nfts')}}
              color=""
            >
              Go To App
            </Button>
            <div className="hidden sm:inline-block">
             <ConnectButtonCustom/>
            </div>
          </div>
        ) : (
          <div className="space-x-[10px] flex items-center">
            <NotifiBell />
            <div className="">
             <ConnectButtonCustom/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
