<?php

namespace App\Entity;

use App\Entity\User;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PersonRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * #@ApiResource(shortName="persons")
 * @ORM\Entity(repositoryClass=PersonRepository::class)
 * 
 */
class Person extends User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180)
     */
    private $pseudo;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $birthdayAt;

    /**
     * @ORM\Column(type="string", length=180, nullable=true)
     */
    private $website;

    // public function getId(): ?int
    // {
    //     return $this->id;
    // }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getBirthdayAt(): ?\DateTimeInterface
    {
        return $this->birthdayAt;
    }

    public function setBirthdayAt(?\DateTimeInterface $birthdayAt): self
    {
        $this->birthdayAt = $birthdayAt;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): self
    {
        $this->website = $website;

        return $this;
    }
}
