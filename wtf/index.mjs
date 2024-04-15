import { ethers } from "ethers";
const main = async () => {
    console.log("Hello, world!")
    const browserProvider = new ethers.BrowserProvider(window.ethereum)
    const signer = await browserProvider.getSigner()
    console.log(signer.address)
}

console.log("start")
main()
