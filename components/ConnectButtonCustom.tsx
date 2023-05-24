import React, { useState } from 'react'
import Button from './Button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import WalletStrategyComponent from './WalletStrategy'

const ConnectButtonCustom = () => {
const [openModal, setOpenModal] = useState(false)


const closeMenu = ()=>{
    setOpenModal(false)
}

  return (
    <>
    <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      mounted,
    }) => {
      // Note: If your app doesn't use authentication, you
      // can remove all 'authenticationStatus' checks
      const ready = mounted
      const connected =
        ready &&
        account &&
        chain

      return (
        <div
          {...(!ready && {
            'aria-hidden': true,
            'style': {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            },
          })}
        >
          {(() => {
            if (!connected) {
              return (
                <Button text="Connect Wallet" color="black" onClick={openConnectModal} />
              );
            }

            if (chain.unsupported) {
              return (
                <Button text="Wrong Network" color="bg-[#ff494a] text-white border-[#ff494a]" onClick={openChainModal} />
               
              );
            }

            return (
              <div style={{ display: 'flex', gap: 12 }}>
                {/* <button
                  onClick={openChainModal}
                  style={{ display: 'flex', alignItems: 'center' }}
                  type="button"
                >
                  {chain.hasIcon && (
                    <div
                      style={{
                        background: chain.iconBackground,
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        overflow: 'hidden',
                        marginRight: 4,
                      }}
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          style={{ width: 12, height: 12 }}
                        />
                      )}
                    </div>
                  )}
                  {chain.name}
                </button> */}

                <Button color='justify-between px-[15px]' onClick={()=>{setOpenModal(true)}}>
{account.displayName}
<svg fill="#000000" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
   viewBox="0 0 330 330" xmlSpace="preserve">
<path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
</svg>
                  </Button>
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
{openModal ? <WalletStrategyComponent closeMenu={closeMenu}/> : null}
  </>
  )
}

export default ConnectButtonCustom