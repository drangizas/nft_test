import { useState } from "react";
import { Button, Container } from "react-bootstrap";

type MetamaskAcc = string;

function App() {
    const [defaultAcc, setDefaultAcc] = useState<MetamaskAcc>();
    const [balance, setBalance] = useState<number>();
    const [error, setError] = useState("");

    const connectWallet = async () => {
        if (!window.ethereum) {
            setError("Metamask is not installed");
            return;
        }

        setError("");

        const reqRes: MetamaskAcc[] = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        onAccountChange(reqRes[0]);
        getCurrAccBalance(reqRes[0]);
    };

    const onAccountChange = (acc: MetamaskAcc) => {
        setDefaultAcc(acc);
    };

    const getCurrAccBalance = async (acc: MetamaskAcc) => {
        const balanceRes = await window.ethereum.request({
            method: "eth_getBalance",
            params: [acc, "latest"],
        });

        setBalance(parseInt(balanceRes, 16));
    };

    return (
        <Container className="mx-auto d-flex flex-column justify-content-center">
            <p className="fs-2">Hello...</p>

            {!defaultAcc && (
                <Button type="button" onClick={connectWallet}>
                    Connect to metamask
                </Button>
            )}

            {defaultAcc && (
                <>
                    <p>Account selected: {defaultAcc}</p>
                    <p>Balance in account: {balance}</p>
                </>
            )}

            {error && (
                <p className="text-danger font-weight-bold fs-5 mt-2">
                    {error}
                </p>
            )}
        </Container>
    );
}

export default App;
