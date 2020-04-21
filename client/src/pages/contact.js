import React from 'react';

function Contact() {
    return (
        <div style={{ height: "80vh" }} class="container">
            <div class="box">
                <div class="columns">
                    <div class="column is-4 is-offset-4">
                        <div class="levels">
                            <div class="level is-mobile">
                                <div class="level-left">
                                    <div class="level-item">
                                        <h2 class="title is-3 is-spaced">Contact Doughboy's</h2>
                                    </div>
                                    </div>
                                    
                            </div>
                            <div class="level is-mobile">
                                <div class="level-left">
                                <div class="level-item">
                                    <h1 class="subtitle is-5">Phone: </h1>
                                </div>
                                <div class="level-item">
                                    <h1 class="subtitle is-5">(314) 629-6580</h1>
                                </div>
                                </div>
                            </div>
                            <div class="level is-mobile">
                                <div class="level-left">
                                <div class="level-item">
                                    <h1 class="subtitle is-5"><a href="mailto:doughboyswoodfiredpizza@yahoo.com">Email us!</a></h1>
                                </div>
                            </div>
                            </div>
                            <div class="level is-mobile">
                                <div class="level-left">
                                <div class="level-item">
                                    <h1 class="subtitle is-5">Facebook: </h1>
                                </div>
                                <div class="level-item">
                                    <h1 class="subtitle is-5"><a href="https://www.facebook.com/stldoughboys/">stldoughboys</a></h1>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;