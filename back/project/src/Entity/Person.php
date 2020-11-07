<?php

namespace App\Entity;

use App\Entity\User;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PersonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
/*
{
  "pseudo": "string",
  "birthdayAt": "2020-11-04T21:14:59.988Z",
  "website": "string",
  "email": "string",
  "username": "string",
  "roles": [
    "string"
  ],
  "password": "string"
}
{
  "pseudo": "Charle",
  "birthdayAt": "2020-11-04T21:14:59.988Z",
  "website": "string",
  "email": "user@yopmail.com",
  "username": "string",
  "roles": [
    "ROLE_USER"
  ],
  "password": "password"
}
*/
/**
 * #@ApiResource()
 * @ApiResource(shortName="persons", iri="http://schema.org/Person")
 * @ORM\Entity(repositoryClass=PersonRepository::class)
 * 
 */
class Person extends User
{
    // /**
    //  * @ORM\Id
    //  * @ORM\GeneratedValue
    //  * @ORM\Column(type="integer")
    //  */
    // protected $id;

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

    /**
     * @ORM\OneToMany(targetEntity=Project::class, mappedBy="user", orphanRemoval=true)
     */
    private $projects;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
    }

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

    /**
     * @return Collection|Project[]
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): self
    {
        if (!$this->projects->contains($project)) {
            $this->projects[] = $project;
            $project->setUser($this);
        }

        return $this;
    }

    public function removeProject(Project $project): self
    {
        if ($this->projects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getUser() === $this) {
                $project->setUser(null);
            }
        }

        return $this;
    }
}
