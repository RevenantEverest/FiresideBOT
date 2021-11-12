import React from 'react';
import { makeStyles, useTheme } from '@fluentui/react-theme-provider';
import {
    MDBRow as Row,
    MDBCol as Col
} from 'mdbreact';
import { motion } from 'framer-motion';
import PremiumPricingCard from './PremiumPricingCard';
import PremiumPricingHeader from './PremiumPricingHeader';
import _Images from '../../../assets/images/_Images';

function PremiumPricing() {

    const theme = useTheme();
    const styles = useStyles();
    
    const userPremiumPerks = [
        { title: "Unlimited Song Request Length", icon: true },
        { title: "Unlimited Playlists", icon: true },
        { title: "Unlimited Song Length for Playlists", icon: true },
        { title: "Double Embers in each Daily command", icon: true },
        { title: "... and more" }
    ];
    const serverPremiumPerks = [
        { title: "Unlimited Server Playlists", icon: true },
        { title: "Unlimited Song Length for Server Playlists", icon: true },
        { title: "Unlimited Server Ranks", icon: true },
        { title: "Unlimited Custom Commands", icon: true },
        { title: "... and more" }
    ];

    return(
        <div>
            <PremiumPricingHeader />
            <Row className="py-3" />
            <Row>
                <Col lg="4" md="12" className="mb-lg-0 mb-4 pr-0 pl-0">
                    <motion.div
                    className={styles.col}
                    initial={{ scale: 1 }}
                    whileHover={{
                        scale: 1.03
                    }}
                    transition={{ duration: .2 }}
                    >
                        <PremiumPricingCard
                        tierName="User" 
                        price={2}
                        perks={userPremiumPerks} 
                        />
                    </motion.div>
                </Col>
                <Col lg="4" md="12" className="mb-lg-0 mb-4 pr-0 pl-0" style={{ zIndex: "10" }}>
                    <motion.div
                    className={"h-100 " + styles.mainCardCol}
                    initial={{ scale: 1.09 }}
                    whileHover={{
                        scale: 1.14
                    }}
                    transition={{ duration: .2 }}
                    >
                        <PremiumPricingCard 
                        tierName="User & Server" 
                        price={3}
                        priceColor={theme.colors.secondary}
                        perksBold
                        perks={[
                            { title: "All Perks from User Premium", icon: true}, 
                            { title: "All Perks from Server Premium", icon: true }
                        ]} 
                        bodyWrapperClass="text-white text-center pricing-card d-flex align-items-center rgba-black-strong px-4 h-100 rounded"
                        backgroundImage={_Images.sideNavBackground}
                        />
                    </motion.div>
                </Col>
                <Col lg="4" md="12" className="mb-lg-0 mb-4 pr-0 pl-0">
                    <motion.div
                    className={styles.col}
                    initial={{ scale: 1 }}
                    whileHover={{
                        scale: 1.03
                    }}
                    transition={{ duration: .2 }}
                    >
                        <PremiumPricingCard
                        tierName="Server" 
                        price={2} 
                        perks={serverPremiumPerks} 
                        />
                    </motion.div>
                </Col>
            </Row>
            <Row className="py-5" />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    col: {
        boxShadow: `0px 0px 20px 8px #0d0d0d`
    },
    mainCardCol: {
        boxShadow: `0px 0px 10px 2px ${theme.colors.primary}`
    }
}));

export default PremiumPricing;