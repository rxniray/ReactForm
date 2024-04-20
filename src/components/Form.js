import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstname:'',
        lastname:'',
        fathername:'',
        email: '',
        password: '',

        numbercard:'',
        datecard:'',
        cvv:''
    });
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        
        // Перевірка паролів при натисканні на кнопку "Відправити"
        validatePasswords(formData.password, formData.confirmPassword);

        if (Object.keys(errors).length === 0 && Object.keys(errors).length === 0) {
            // Імітація відправки форми, зберігаємо дані у стані
            setSubmittedData(formData);
            // Очистити форму після відправки
            setFormData({
                username: '',
                firstname:'',
                lastname:'',
                fathername:'',
                email: '',
                password: '',

                numbercard:'',
                datecard:'',
                cvv:''
            });
        } else {
            setErrors(errors);
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.username.trim()) {
            errors.username = 'Ім\'я користувача обов\'язкове';
        }
        if (!data.firstname.trim()) {
            errors.firstname = 'Прізвище користувача обов\'язкове';
        }
        if (!data.fathername.trim()) {
            errors.fathername = 'Ім\'я по батькові користувача обов\'язкове';
        }
        if (!data.email.trim()) {
            errors.email = 'Електронна пошта обов\'язкова';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Введіть дійсну адресу електронної пошти';
        }
        if (!data.password.trim()) {
            errors.password = 'Пароль обов\'язковий';
        } else if (data.password.length < 6) {
            errors.password = 'Пароль повинен містити принаймні 6 символів';
        }
        if (!data.numbercard.trim()) {
            errors.numbercard = 'Номер карти обов\'язковий';
        } else if (data.numbercard.length < 16) {
            errors.numbercard = 'Карта повинна містити 16 символів';
        }
        if (!data.datecard.trim()) {
            errors.datecard = 'Дата карти обов\'язковий';
        } else if (data.datecard.length < 4) {
            errors.datecard = 'Дата карти має містити 4 символа';
        }
        if (!data.cvv.trim()) {
            errors.cvv = 'CVV код карти обов\'язковий';
        } else if (data.cvv.length < 3) {
            errors.cvv = 'CVV код повинен містити 3 символа';
        }
        
        return errors;
    };

    const validatePasswords = (password, confirmPassword) => {
        let errors = {};

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Паролі не співпадають';
        } else {
            delete errors.confirmPassword; 
        }

        setErrors(errors);
    };

    return (
        <div>
            {submittedData ? (
                <div className="submitted-data">
                    <div class="">
                        <h1>Беремо і забираємо</h1>
                    </div>
                    <h2>Дякуємо за відправку!</h2>
                    <p>Отримані дані:</p>
                    <p><strong>Псевдонім користувача:</strong> {submittedData.username}</p>

                    <p><strong>Ім'я:</strong> {submittedData.firstname}</p>
                    <p><strong>Прізвище:</strong> {submittedData.lastname}</p>
                    <p><strong>По батькові:</strong> {submittedData.fathername}</p>

                    <p><strong>Електронна пошта:</strong> {submittedData.email}</p>
                    <p><strong>Пароль:</strong> {submittedData.password}</p>

                    <p><strong>Номер карти:</strong> {submittedData.numbercard}</p>

                </div>
            ) : (
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label>Псевдонім користувача:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className='row-div'>
                        <div className="form-group">
                            <label>Ім'я:</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                            {errors.firstname && <p className="error">{errors.firstname}</p>}
                        </div>
                        <div className="form-group">
                            <label>Прізвище:</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                            {errors.lastname && <p className="error">{errors.lastname}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>По батькові:</label>
                        <input
                            type="text"
                            name="fathername"
                            value={formData.fathername}
                            onChange={handleChange}
                        />
                        {errors.fathername && <p className="error">{errors.fathername}</p>}
                    </div>
                    <div className="form-group">
                        <label>Електронна пошта:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Пароль:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    
                    <div className="form-group">
                        <label>Номер карти:</label>
                        <input
                            type="text"
                            name="numbercard"
                            placeholder='0000 0000 0000 0000'
                            maxlength="16"
                            pattern="[0-9]*" 
                            value={formData.numbercard}
                            onChange={handleChange}
                        />
                        {errors.numbercard && <p className="error">{errors.numbercard}</p>}
                    </div>
                    <div className='row-div'>
                        <div className="form-group">
                            <label>Дата:</label>
                            <input
                                type="text"
                                name="datecard"
                                maxlength="4"
                                pattern="[0-9]*" 
                                placeholder='nn/nn'
                                value={formData.datecard}
                                onChange={handleChange}
                            />
                            {errors.datecard && <p className="error">{errors.datecard}</p>}
                        </div>
                        <div className="form-group">
                            <label>CVV:</label>
                            <input
                                type="text"
                                name="cvv"
                                maxlength="3"
                                pattern="[0-9]*" 
                                placeholder='cvv'
                                value={formData.cvv}
                                onChange={handleChange}
                            />
                            {errors.cvv && <p className="error">{errors.cvv}</p>}
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Відправити</button>
                </form>
            )}
        </div>
    );
};

export default Form;
