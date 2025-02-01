import React, { useState, useEffect } from 'react';
import './Carrinho.css';

const Carrinho = () => {

    const [carrinho, setCarrinho] = useState([]);
    const [codDesconto, setCodDesconto] = useState('');
    const [total, setTotal] = useState(0);

    const calcTotal = (carrinhoAtual) => {
        return carrinhoAtual.reduce((acc, item) => acc + item.quantidade * item.preco, 0);
    };

    useEffect(() => {
        setTotal(calcTotal(carrinho));
    }, [carrinho]);

    const addItem = (event) => {
        event.preventDefault();

        const nomeItem = event.target.nomeItem.value;
        const quantItem = parseInt(event.target.quantItem.value);
        const precoItem = parseFloat(event.target.precoItem.value);

        const itemExistente = carrinho.find((item) => item.nome === nomeItem);
        if (itemExistente) {
            itemExistente.quantidade += quantItem;
            setCarrinho([...carrinho]);
        } else {
            setCarrinho([...carrinho, { nome: nomeItem, quantidade: quantItem, preco: precoItem }]);
        }

        event.target.reset();
    };

    const removeItem = (id) => {
        const newCart = carrinho.filter((_, i) => i !== id);
        setCarrinho(newCart);
        alert('Item removido!');
    };

    const aumentarQuantidade = (id) => {
        const newCart = carrinho.map((item, i) =>
        i === id ? { ...item, quantidade: item.quantidade + 1 } : item);
        setCarrinho(newCart);
    } 

    const diminuirQuantidade = (id) => {
        const newCart = carrinho.map((item, i) =>
        i === id && item.quantidade > 1 ? { ...item, quantidade: item.quantidade - 1 } : item);
        setCarrinho(newCart);
    }

    const aplicarDesconto = (event) => {
        event.preventDefault();

        let desconto = 0;

        if (codDesconto === 'DESC10') {
            desconto = 0.1;
        } else if (codDesconto === 'DESC20') {
            desconto = 0.2;
        } else {
            alert('Código de Desconto Inválido!');
            return;
        }

        const novoTotal = total * (1 - desconto);
        setTotal(novoTotal.toFixed(2));
        alert(`Desconto de ${(desconto * 100).toFixed(2)}% Aplicado!`);
        setCodDesconto('');
    }

    return (
        <>
            <div className="container">
                <h1>Gerenciador de Carrinho</h1>

                <form onSubmit={addItem}>
                    <input type="text" name="nomeItem" placeholder="Nome do item" required />
                    <input type="number" name="quantItem" placeholder="Quantidade" min="1" required />
                    <input type="number" name="precoItem" placeholder="Preço" step="0.01" min="0" required />
                    <button type="submit">Adicionar Item</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>Subtotal</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrinho.map((item, id) => (
                        <tr key={id}>
                            <td>{item.nome}</td>
                            <td>
                                <button onClick={() => diminuirQuantidade(id)}>-</button>
                                {item.quantidade}
                                <button onClick={() => aumentarQuantidade(id)}>+</button>
                            </td>
                            <td>R$ {item.preco.toFixed(2)}</td>
                            <td>R$ {(item.quantidade * item.preco).toFixed(2)}</td>
                            <td>
                                <button className="remove-button" onClick={() => removeItem(id)}>Remover</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                <div className="total">Total: R$ {total}</div>

                <form onSubmit={aplicarDesconto} className="desconto-form">
                    <input
                        type="text"
                        value={codDesconto}
                        onChange={(e) => setCodDesconto(e.target.value)}
                        placeholder="Código de desconto"
                    />
                    <button type="submit">Aplicar Desconto</button>
                </form>
            </div>
        </>
    );
}

export default Carrinho