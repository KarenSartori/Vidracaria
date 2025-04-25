<?php
include '../conexao.php';

$resultado = $conn->query("SELECT * FROM precos_fechaduras");

if ($resultado->num_rows > 0) {
  echo '<table>
          <thead>
            <tr>
              <th>Tipo de Fechadura</th>
              <th>Preço (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>';
  while ($linha = $resultado->fetch_assoc()) {
    echo '<tr>';
    echo '<td>' . htmlspecialchars($linha['tipo']) . '</td>';
    echo '<td>R$ ' . number_format($linha['preco'], 2, ',', '.') . '</td>';
    echo '<td>
            <a href="#" onclick="editarFechadura(' . $linha['id'] . ')" title="Editar">
              <i class="fa-solid fa-pen-to-square"></i>
            </a>
            &nbsp;&nbsp;
            <a href="#" onclick="removerFechadura(' . $linha['id'] . ')" title="Excluir">
              <i class="fa-solid fa-trash" style="color: red;"></i>
            </a>
          </td>';
    echo '</tr>';
  }
  echo '</tbody></table>';
} else {
  echo "<p>Nenhuma fechadura cadastrada.</p>";
}
?>
