<?php
include '../conexao.php';

$resultado = $conn->query("SELECT * FROM materiais");

if ($resultado->num_rows > 0) {
  echo '<table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Peso (kg/m)</th>
              <th>Valor (kg alumínio)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>';
  while ($linha = $resultado->fetch_assoc()) {
    echo '<tr>';
    echo '<td>' . htmlspecialchars($linha['nome']) . '</td>';
    echo '<td>' . number_format($linha['peso_kg_m'], 3, ',', '.') . '</td>';
    echo '<td>R$ ' . number_format($linha['peso_kg_aluminio'], 2, ',', '.') . '</td>';
    echo '<td>
            <button class="btn-editar" onclick="abrirModalEdicao(' . $linha['id'] . ')">
              <i class="fa fa-edit"></i>
            </button>
          </td>';
    echo '</tr>';
  }
  echo '</tbody></table>';
} else {
  echo "<p>Nenhum material cadastrado.</p>";
}
?>
