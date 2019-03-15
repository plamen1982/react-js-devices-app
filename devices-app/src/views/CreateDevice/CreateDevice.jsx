import React, { Component } from "react";

class CreateDevice extends Component {
    render() {
        return (
            <div className="form-wrapper">
                <h1>Create New Device</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="model">model</label>
                        <input
                            type="text"
                            name="model"
                            id="model"
                            placeholder="Enter Device model"
                            value=""
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Enter Device description"
                            value=""
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="Enter Device image URL"
                            value=""
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="creator">Creator</label>
                        <input
                            type="text"
                            name="creator"
                            id="creator"
                            placeholder="Enter Device creator"
                            value=""
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Enter Device price"
                            value=""
                        />
                    </div>
                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}

export default CreateDevice;