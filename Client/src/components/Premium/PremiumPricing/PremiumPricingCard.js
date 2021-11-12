import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBCard,
    MDBCardBody,
    MDBIcon
} from 'mdbreact';
import { FirBtn } from '../../Common';

function PremiumPricingCard({ tierName, price, priceColor, perks, perksBold, backgroundImage, bodyWrapperClass }) {

    const styles = useStyles();

    const renderPerks = () => {
        return perks.map(perk => (
            <div className={`d-flex justify-content-center ${perksBold && "font-weight-bold"}`} key={perk.title}>
                {perk.icon && <MDBIcon icon="check" className="mr-2" style={{ color: "lime" }} />}
                <p>{perk.title}</p>
            </div>
        ));
    };

    return(
        <MDBCard 
        pricing 
        className={"card-image h-100 " + styles.card} 
        style={ 
            backgroundImage && {backgroundImage: `url("${backgroundImage}")`}
        }
        >
            <div className={[bodyWrapperClass, "pb-4"].join(" ")}>
                <MDBCardBody className={styles.cardBody}>
                <h5 className="font-weight-bold mt-3">
                    {tierName}
                </h5>
                <div className="price pt-0">
                    <h2 className={"number mb-0"} style={{ color: priceColor }}>
                        {price}
                    </h2>
                </div>
                <ul className="striped mb-1">
                    {renderPerks()}
                </ul>
                <FirBtn className="font-weight-bold" rounded>
                    Purcahse
                </FirBtn>
                </MDBCardBody>
            </div>
        </MDBCard>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: `${theme.colors.card} !important`
    },
    cardBody: {
        color: theme.colors.text
    }
}));

PremiumPricingCard.defaultProps = {
    backgroundImage: null,
    bodyWrapperClass: "",
    priceColor: "white",
    perksBold: false
};

PremiumPricingCard.propTypes = {
    tierName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    perks: PropTypes.array.isRequired,
    perksBold: PropTypes.bool
};

export default PremiumPricingCard;