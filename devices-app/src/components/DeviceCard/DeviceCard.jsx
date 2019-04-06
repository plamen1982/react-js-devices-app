import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from "../../context/user-context"
class DeviceCard extends Component {
    render() {
        const { image, model, description, deviceId, price, user } = this.props;
        const isAdmin = user.roles.includes('Admin');
        const isLoggedIn = user.isLoggedIn;
        return (
            <div className="card col-6">
                <img
                    className="card-img-top card-image"
                    src={image}
                    alt={model}
                />
                <div className="card-body">
                    <h5 className="card-title">
                        {model}
                    </h5>
                    <p className="card-text">
                        {description}
                    </p>
                    <h5 className="card-title">
                        {price}
                    </h5>
                </div>
                
                <div className="card-footer">
                    <small className="text-muted" />
                    {
                        !isLoggedIn
                            ? null
                            : (
                                isAdmin 
                                ? <Link className="btn btn-warning float-right btn-sm" to={`/edit/${deviceId}`}> Edit </Link>
                                : <Link className="btn btn-primary float-right btn-sm" to={`/borrow/${deviceId}`}> Borrow </Link>
                            )

                    }

                    {
                        !isLoggedIn
                        ? null 
                        : (
                            isAdmin
                            ? <Link className="btn btn-danger float-right btn-sm" to={`/delete/${deviceId}`}> Delete </Link>
                            : <Link className="btn btn-secondary float-right btn-sm" to={`/review/${deviceId}`}> Review </Link>
                        )
                    }

                </div>
            </div>
        );
    }
}

const DeviceCardWithUserConsumer = (props) => {
    return (
        <UserConsumer>
            {
                ({ user }) => (
                    <DeviceCard 
                        user={user}
                        {...props}
                    />
                )
            }
        </UserConsumer>
    )
}

export default DeviceCardWithUserConsumer;
