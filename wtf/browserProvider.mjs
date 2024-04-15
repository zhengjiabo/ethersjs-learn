import { ethers } from "ethers";
const main = async () => {
    const browserProvider = new ethers.BrowserProvider(window.ethereum)
    const signer = await browserProvider.getSigner()
    console.log(signer.address)
}

main()
